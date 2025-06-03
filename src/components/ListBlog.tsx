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
  Input,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author_name: string;
  author_id: string;
}

const BlogsList = () => {
  const PAGE_SIZE = 5;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openCreateModal = () => {
    setEditingBlog(null);
    setFormData({ title: "", content: "" });
    onOpen();
  };

  const openEditModal = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content });
    onOpen();
  };

  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
    } else {
      setUserId(user?.id || null);
    }
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

    if (error) {
      alert("Failed to load blogs: " + error.message);
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };



  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <Flex
      direction="column"
      minH="100vh"
      w="100%"
      background="linear-gradient(to bottom, #8B4513, #EDC9AF)"
      color="gray.700"
      px={4}
      py={8}
      align="center"
      justify="center"
      id="blogsList-section"
    >
      <Box maxW="800px" w="100%" p={8} bg="gray.900" borderRadius="lg" boxShadow="2xl">
        <Flex mb={8} align="center">
          <Heading size="xl" fontWeight="bold" letterSpacing="tight" color="teal.300">
            Blog Posts
          </Heading>
          <Spacer />
          <Button onClick={openCreateModal} colorScheme="teal" size="md" fontWeight="bold">
            + New Blog
          </Button>
        </Flex>

        {loading ? (
          <Flex justify="center" my={10}>
            <Spinner size="xl" />
          </Flex>
        ) : blogs.length === 0 ? (
          <Text textAlign="center" fontSize="lg" mt={10} color="gray.500">
            No blogs found.
          </Text>
        ) : (
          <VStack spacing={6} align="stretch" divider={<StackDivider borderColor="gray.700" />}>
            {blogs.map((blog) => (
              <Box
                key={blog.id}
                p={6}
                bg="gray.800"
                borderRadius="md"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
              >
                <Heading size="md" fontWeight="semibold" mb={2} color="teal.200">
                  {blog.title}
                </Heading>
                <Text fontSize="sm" color="gray.400" mb={2}>
                  Author: {blog.author_name}
                </Text>
                <Text noOfLines={3} mb={4} color="gray.300">
                  {blog.content}
                </Text>

                <Flex justify="flex-end" gap={2}>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    variant="outline"
                    isDisabled={userId !== blog.author_id}
                    onClick={() => openEditModal(blog)}
                  >
                    Edit
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        )}

        <Flex mt={12} justify="space-between">
          <Button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            colorScheme="teal"
            variant="solid"
            fontWeight="bold"
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            ← Previous
          </Button>
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={blogs.length < PAGE_SIZE}
            colorScheme="teal"
            variant="solid"
            fontWeight="bold"
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            Next →
          </Button>
        </Flex>
      </Box>

      {/* Modal for Create/Edit Blog */}
     <Modal isOpen={isOpen} onClose={onClose} size="xl">
  <ModalOverlay />
  <ModalContent bg="gray.800" color="white">
    <ModalHeader>{editingBlog ? "Edit Blog" : "New Blog"}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {editingBlog ? (
        <UpdateBlog blogId={editingBlog.id.toString()} />
      ) : (
        <CreateBlog
          onSuccess={() => {
            onClose();
            fetchBlogs(page);
          }}
          onCancel={onClose}
        />
      )}
    </ModalBody>
  </ModalContent>
</Modal>
    </Flex>
  );
};

export default BlogsList;