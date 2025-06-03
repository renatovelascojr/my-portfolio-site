import { useState } from "react";
import { supabase } from "../utils/supabaseClient.ts";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, useToast } from "@chakra-ui/react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

 const handleCreate = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevent default form submission behavior

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error fetching session:", sessionError);
    return;
  }

  if (!session?.user) {
    alert("You must be logged in to create a blog.");
    return;
  }

  const user = session.user;
  const email = user.email;
  const name = user.user_metadata?.full_name || "Anonymous";

  const { data, error } = await supabase
    .from("blogs")
    .insert([
      {
        title,
        content,
        user_id: user.id,
        author_email: email,
        author_name: name,
      },
    ]);

  if (error) {
    toast({
      title: "Error",
      description: error.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  } else {
    toast({
      title: "Blog created",
      description: "Your blog has been successfully posted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTitle("");
    setContent("");
  }
};

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md" bg="gray.800" color="white">
      <VStack as="form" spacing={4} onSubmit={handleCreate}>
        <Heading size="md">Create a Blog</Heading>

        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Content</FormLabel>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full">Create</Button>
      </VStack>
    </Box>
  );
};

export default CreateBlog;