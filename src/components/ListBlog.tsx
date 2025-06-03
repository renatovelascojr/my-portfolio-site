import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient.ts";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author_name: string;
}

const BlogsList = () => {
  const PAGE_SIZE = 5;
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
      return;
    }

    setBlogs(data || []);
    setLoading(false);
  };

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
      <Box
        maxW="800px"
        w="100%"
        p={8}
        bg="gray.900"
        borderRadius="lg"
        boxShadow="2xl"
      >
        <Flex mb={8} align="center">
          <Heading
            size="xl"
            fontWeight="bold"
            letterSpacing="tight"
            color="teal.300"
            
          >
            Blog Posts
          </Heading>
          <Spacer />
          <Button
            as={Link}
            to="/blogs/create"
            colorScheme="teal"
            size="md"
            fontWeight="bold"
            _hover={{ bg: "teal.400" }}
          >
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
          <VStack
            spacing={6}
            align="stretch"
            divider={<StackDivider borderColor="gray.700" />}
          >
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
                    as={Link}
                    to={`/blogs/update/${blog.id}`}
                    size="sm"
                    colorScheme="teal"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  {/* Add Delete button here if needed */}
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
    </Flex>
  );
};

export default BlogsList;