import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import PostButton from "@/components/common/Post/PostButton";
import SubscribeButton from "@/components/common/SubscribeButton";
import { PostType, ArticleFormValues } from "@/lib/types/postListType";
import { sortOptions } from "@/lib/data/sortOptions";
import EmptyState from "@/components/common/EmptyState";
import PostsGrid from "@/components/common/Post/PostGrid";
import PostsList from "@/components/common/Post/PostsList";
import SearchBar from "@/components/common/SearchBar";
import SortSelect from "@/components/common/SortSelect";
import ViewModeToggle from "@/components/common/ViewModeToggle";
import { useRouter } from "next/router";
import Banner from "@/components/common/Banner";
import { useForm } from "react-hook-form";
import { useLoading } from "@/lib/context/LoadingContext";
import PostAPI from "@/services/Post/PostAPI";

const getCategoryColor = (color: string) => {
  return {
    bg: color + "33", // 透明度 0.2
    text: color,
  };
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
  const [boardAvatar, setBoardAvatar] = useState<string | null>(null);
  const [boardColor, setBoardColor] = useState("#64748b");

  const fetchPosts = async (params: {
    type?: string;
    sort?: string;
    search?: string;
  }) => {
    try {
      setLoading(true);
      const res = await PostAPI.list({
        board: params.type,
        sort: params.sort,
        search: params.search,
      });

      const data = res.data;
      setTitle(data.boardName || "所有文章");
      setBoardAvatar(data.boardAvatar || null);
      setBoardColor(data.boardColor || "#64748b");
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady && type) {
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
    fetchPosts({
      type: type as string,
      sort: getValues("sortType"),
      search: getValues("searchValue"),
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

  const categoryColor = getCategoryColor(boardColor);

  return (
    <Layout title={title}>
      <Banner
        title={title}
        content={content}
        avatarUrl={boardAvatar}
        textColor={categoryColor.text}
      >
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
        <PostsGrid posts={posts} getCategoryColor={() => categoryColor} />
      ) : (
        <PostsList posts={posts} getCategoryColor={() => categoryColor} />
      )}
    </Layout>
  );
}
