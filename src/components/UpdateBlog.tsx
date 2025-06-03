import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient.ts";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
  HStack,
} from "@chakra-ui/react";

interface BlogData {
  title: string;
  content: string;
  author_name?: string | null;
  author_email?: string | null;
}

interface UpdateBlogProps {
  blogId: string;  // or number, whatever type your blog ID is
}

const UpdateBlog = ({ blogId }: UpdateBlogProps) => {
    console.log("Received blogId prop:", blogId)
    console.log("Exact blogId string:", JSON.stringify(blogId));
    console.log("Type of blogId:", typeof blogId);
  const [blog, setBlog] = useState<BlogData>({
    title: "",
    content: "",
    author_name: "",
    author_email: "",
  });

  const toast = useToast();
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchBlog() {
      if (!blogId) return;

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .single();

      if (error) {
        toast({
          title: "Error fetching blog",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      console.log("Fetched data:", data);

      if (data) {
        setBlog({
          title: data.title,
          content: data.content,
          author_name: data.author_name,
          author_email: data.author_email,
        });
      }
    }

    fetchBlog();
  }, [blogId, toast]);

  const handleChange = (field: keyof BlogData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlog((prev) => ({ ...prev, [field]: e.target.value }));
    
  };
  console.log(blog)

  const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Updating with ID:", blogId);
console.log("New values:", blog);
console.log("blogId:", blogId, typeof blogId);
  if (!blogId) return;

  console.log("Attempting to update blog with ID:", blogId);
  console.log("New data:", blog);

  const { data, error } = await supabase
    .from("blogs")
    .update({
      title: blog.title,
      content: blog.content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", blogId)
    .select(); // 👈 This is important to verify update

    console.log("Update response:", { data, error });

  if (error) {
    console.error("Update error:", error);
    toast({
      title: "Failed to update blog",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  } else if (!data || data.length === 0) {
    console.warn("Update success but no data returned. Maybe no matching blog?");
    toast({
      title: "Update did not affect any blog",
      description: "No matching blog found to update. Check blogId format.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  } else {
    console.log("Blog successfully updated:", data);
    toast({
      title: "Blog updated!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  }
};

  const handleDelete = async () => {
    if (!blogId) return;
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", blogId);

    if (error) {
      toast({
        title: "Failed to delete blog",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Blog deleted!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="md"
      bg="gray.800"
      color="white"
    >
      <VStack as="form" spacing={4} onSubmit={handleUpdate}>
        <Heading size="md">Update Blog</Heading>

        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={blog.title} onChange={handleChange("title")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Content</FormLabel>
          <Textarea value={blog.content} onChange={handleChange("content")} />
        </FormControl>

        <HStack spacing={4} width="full">
          <Button type="submit" colorScheme="teal" flex={1}>
            Update
          </Button>
          <Button colorScheme="red" onClick={handleDelete} flex={1}>
            Delete
          </Button>
        </HStack>
      </VStack>

      <Box fontSize="sm" mt={4} color="gray.400">
        <div>Author: {blog.author_name || "Unknown"}</div>
        <div>Email: {blog.author_email || "Unknown"}</div>
      </Box>
    </Box>
  );
};

export default UpdateBlog;