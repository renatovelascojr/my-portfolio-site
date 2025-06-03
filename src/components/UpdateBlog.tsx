import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient.ts";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, useToast, HStack } from "@chakra-ui/react";

const UpdateBlog = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single();
      if (error) {
        toast({ title: "Error fetching blog", description: error.message, status: "error" });
        return;
      }
      if (data) {
        setTitle(data.title);
        setContent(data.content);
        setAuthorName(data.author_name); // optional
        setAuthorEmail(data.author_email);
      }
    }
    if (id) fetchBlog();
  }, [id, toast]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("blogs").update({
      title,
      content,
      updated_at: new Date().toISOString(),
    }).eq("id", id);

    if (error) {
      toast({ title: "Failed to update blog", description: error.message, status: "error" });
    } else {
      toast({ title: "Blog updated!", status: "success" });
      navigate("/blogs"); // or wherever
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      toast({ title: "Failed to delete blog", description: error.message, status: "error" });
    } else {
      toast({ title: "Blog deleted!", status: "success" });
      navigate("/blogs");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md" bg="gray.800" color="white">
      <VStack as="form" spacing={4} onSubmit={handleUpdate}>
        <Heading size="md">Update Blog</Heading>

        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Content</FormLabel>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </FormControl>

        <HStack spacing={4} width="full">
          <Button type="submit" colorScheme="teal" flex={1}>Update</Button>
          <Button colorScheme="red" onClick={handleDelete} flex={1}>Delete</Button>
        </HStack>
      </VStack>
      <Box fontSize="sm" mt={4} color="gray.400">
        <div>Author: {authorName}</div>
        <div>Email: {authorEmail}</div>
      </Box>
    </Box>
  );
};

export default UpdateBlog;