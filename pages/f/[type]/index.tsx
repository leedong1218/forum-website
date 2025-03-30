import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import PostButton from "@/components/common/Post/PostButton";
import SubscribeButton from "@/components/common/SubscribeButton";
import { PostType, ArticleFormValues } from "@/lib/types/postListType";
import { sortOptions } from "@/lib/data/sortOptions";
import { samplePosts } from "@/lib/data/postListData";
import EmptyState from "@/components/common/EmptyState";
import PostsGrid from "@/components/common/Post/PostGrid";
import PostsList from "@/components/common/Post/PostsList";
import SearchBar from "@/components/common/SearchBar";
import SortSelect from "@/components/common/SortSelect";
import ViewModeToggle from "@/components/common/ViewModeToggle";
import { ArticleOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import Banner from "@/components/common/Banner";
import { useForm } from "react-hook-form";
import { useLoading } from "@/lib/context/LoadingContext";

const getCategoryColor = (category: string) => {
  const categoryColors: { [key: string]: { bg: string; text: string } } = {
    "科技": { bg: "#e0f2fe", text: "#0284c7" },
    "人工智慧": { bg: "#fce7f3", text: "#db2777" },
    "開發": { bg: "#dcfce7", text: "#16a34a" },
    "區塊鏈": { bg: "#fef3c7", text: "#d97706" },
  };

  return categoryColors[category] || { bg: "#f1f5f9", text: "#64748b" };
};

export default function Article() {
  const router = useRouter();
  const { type } = router.query;
  const { setLoading } = useLoading();

  const { register, getValues, control, watch, setValue } =
    useForm<ArticleFormValues>({
      defaultValues: {
        sortType: "熱門",
        searchValue: "",
        viewMode: "grid",
      },
    });

  const viewMode = watch("viewMode");
  const searchTerm = watch("searchValue");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchPosts = async (params: {
    type?: string;
    sort?: string;
    search?: string;
  }) => {
    try {
      console.log("API call with params:", params);
      setPosts(samplePosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (router.isReady && type) {
      setTitle("所有文章");
      setContent("");

      const sortType = getValues("sortType");
      const searchValue = getValues("searchValue");

      fetchPosts({
        type: type as string,
        sort: sortType,
        search: searchValue,
      });
    }
  }, [router.isReady, type, getValues]);

  const handleSortChange = (value: string) => {
    fetchPosts({
      type: type as string,
      sort: value,
      search: getValues("searchValue"),
    });
  };

  const handleSearch = () => {
    const value = getValues("searchValue");

    fetchPosts({
      type: type as string,
      sort: getValues("sortType"),
      search: value,
    });
  };

  const handleClearSearch = () => {
    setValue("searchValue", "");

    fetchPosts({
      type: type as string,
      sort: getValues("sortType"),
      search: "",
    });
  };

  return (
    <Layout title={title}>
      <Banner title={title} content={content} icon={ArticleOutlined}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 2,
            position: "relative",
            zIndex: 1,
          }}
        >
          <PostButton />
          <SubscribeButton />
        </Box>
      </Banner>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          mb: 4,
          gap: 2,
        }}
      >
        <SearchBar
          placeholder="搜尋文章..."
          registerName="searchValue"
          register={register}
          onSearch={handleSearch}
          ariaLabel="搜尋文章"
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <SortSelect
            name="sortType"
            control={control}
            options={sortOptions}
            onSortChange={handleSortChange}
          />

          <ViewModeToggle name="viewMode" control={control} />
        </Box>
      </Box>

      {posts.length === 0 ? (
        <EmptyState searchTerm={searchTerm} onClearSearch={handleClearSearch} />
      ) : viewMode === "grid" ? (
        <PostsGrid posts={posts} getCategoryColor={getCategoryColor} />
      ) : (
        <PostsList posts={posts} getCategoryColor={getCategoryColor} />
      )}
    </Layout>
  );
}
