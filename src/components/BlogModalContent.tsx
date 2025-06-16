import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient.ts";
import CreateBlog from "./CreateBlog.tsx";
import UpdateBlog from "./UpdateBlog.tsx";
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Flex,
  Spacer,
  StackDivider,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author_name: string;
  author_id: string;
}

const ExpandableText = ({ content }: { content: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Box>
      <Text noOfLines={isExpanded ? undefined : 3} mb={2} color="gray.300">
        {content}
      </Text>
      {content.length > 150 && (
        <Button onClick={() => setIsExpanded(!isExpanded)} variant="link" size="sm" colorScheme="teal">
          {isExpanded ? "Show less" : "Read more"}
        </Button>
      )}
    </Box>
  );
};

const BlogModalContent = () => {
  const PAGE_SIZE = 5;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openCreateModal = () => {
  if (!userId) {
    toast({
      title: "Authentication Required",
      description: "You must log in first to create a blog.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    return;
  }

  setEditingBlog(null);
  onOpen();
};
  const openEditModal = (blog: Blog) => {
  if (!userId) {
    toast({
      title: "Authentication Required",
      description: "You must log in first to edit a blog.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    return;
  }

  setEditingBlog(blog);
  onOpen();
};

  const fetchUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!error && user) setUserId(user.id);
  };

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await supabase
      .from("blogs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error && data) setBlogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <Box maxW="800px" w="100%" p={6} bg="gray.900" borderRadius="lg">
      <Flex mb={4} align="center">
        <Heading size="lg" color="teal.300">Blog Posts</Heading>
        <Spacer />
        <Button onClick={openCreateModal} colorScheme="teal" size="sm">+ New Blog</Button>
      </Flex>

      {loading ? (
        <Flex justify="center" my={10}><Spinner size="xl" /></Flex>
      ) : blogs.length === 0 ? (
        <Text color="gray.400">No blogs found.</Text>
      ) : (
        <VStack spacing={4} align="stretch" divider={<StackDivider borderColor="gray.700" />}>
          {blogs.map((blog) => (
            <Box key={blog.id} p={4} bg="gray.800" borderRadius="md">
              <Heading size="md" color="teal.200">{blog.title}</Heading>
              <Text fontSize="sm" color="gray.400">Author: {blog.author_name}</Text>
              <ExpandableText content={blog.content} />
              {userId === blog.author_id && (
                <Flex justify="flex-end" mt={2}>
                  <Button size="sm" variant="outline" colorScheme="teal" onClick={() => openEditModal(blog)}>
                    Edit
                  </Button>
                </Flex>
              )}
            </Box>
          ))}
        </VStack>
      )}

      <Flex mt={8} justify="space-between">
        <Button onClick={() => setPage(p => Math.max(p - 1, 0))} isDisabled={page === 0}>
          ← Previous
        </Button>
        <Button onClick={() => setPage(p => p + 1)} isDisabled={blogs.length < PAGE_SIZE}>
          Next →
        </Button>
      </Flex>

      {/* Nested modal inside modal for editing/creating */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>{editingBlog ? "Edit Blog" : "New Blog"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom="50px" marginTop="-2">
            {editingBlog ? (
              <UpdateBlog
                blogId={editingBlog.id.toString()}
                onSuccess={() => {
                  onClose();          // closes modal
                  fetchBlogs(page);   // refreshes blog list
                }}
              />
            ) : (
              <CreateBlog onSuccess={() => { onClose(); fetchBlogs(page); }} onCancel={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BlogModalContent;