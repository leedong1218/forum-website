import { useEffect, useState, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import PostButton from "@/components/common/Post/PostButton";
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
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";

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
  const [content] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [boardAvatar, setBoardAvatar] = useState<string | null>(null);
  const [boardColor, setBoardColor] = useState("#64748b");
  
  // 無限滾動相關狀態
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // 修改 fetchPosts 函數以支援分頁
  const fetchPosts = async (params: {
    type?: string;
    sort?: string;
    search?: string;
    page?: number;
    isLoadMore?: boolean;
  }) => {
    const { page = 1, isLoadMore = false } = params;
    
    try {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setLoading(true);
        setInitialLoad(true);
      }

      const res = await PostAPI.list({
        board: params.type,
        sort: params.sort,
        search: params.search,
        page: page,
      });

      const data = res.data;
      
      if (!isLoadMore) {
        // 初次載入或重新搜尋時，重置貼文列表
        setTitle(data?.boardName || "所有文章");
        setBoardAvatar(data?.boardAvatar || null);
        setBoardColor(data?.boardColor || "#64748b");
        setPosts(data?.posts || []);
        setCurrentPage(1);
      } else {
        // 載入更多時，將新貼文添加到現有列表
        setPosts(prevPosts => [...prevPosts, ...(data?.posts || [])]);
      }
      
      // 檢查是否還有更多資料
      setHasMore(data?.hasMore !== false && (data?.posts?.length || 0) > 0);
      
    } catch (error) {
      console.error("Error fetching posts:", error);
      if (!isLoadMore) {
        setPosts([]);
      }
      setHasMore(false);
    } finally {
      if (isLoadMore) {
        setIsLoadingMore(false);
      } else {
        setLoading(false);
        setInitialLoad(false);
      }
    }
  };

  // 載入更多貼文的處理函數
  const loadMorePosts = useCallback(async () => {
    if (!hasMore || isLoadingMore || initialLoad) return;
    
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    
    await fetchPosts({
      type: type as string,
      sort: getValues("sortType"),
      search: getValues("searchValue"),
      page: nextPage,
      isLoadMore: true,
    });
  }, [hasMore, isLoadingMore, initialLoad, currentPage, type, getValues]);

  // 使用無限滾動 hook
  const { setupObserver } = useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: loadMorePosts,
  });

  // 初次載入資料
  useEffect(() => {
    if (router.isReady && type) {
      const sortType = getValues("sortType");
      const searchValue = getValues("searchValue");

      fetchPosts({
        type: type as string,
        sort: sortType,
        search: searchValue,
        page: 1,
      });
    }
  }, [router.isReady, type]);

  // 處理排序變更
  const handleSortChange = (value: string) => {
    setPosts([]); // 清空現有貼文
    setCurrentPage(1);
    setHasMore(true);
    
    fetchPosts({
      type: type as string,
      sort: value,
      search: getValues("searchValue"),
      page: 1,
    });
  };

  // 處理搜尋
  const handleSearch = () => {
    setPosts([]); // 清空現有貼文
    setCurrentPage(1);
    setHasMore(true);
    
    fetchPosts({
      type: type as string,
      sort: getValues("sortType"),
      search: getValues("searchValue"),
      page: 1,
    });
  };

  // 處理清除搜尋
  const handleClearSearch = () => {
    setValue("searchValue", "");
    setPosts([]); // 清空現有貼文
    setCurrentPage(1);
    setHasMore(true);
    
    fetchPosts({
      type: type as string,
      sort: getValues("sortType"),
      search: "",
      page: 1,
    });
  };

  const categoryColor = getCategoryColor(boardColor);

  // 渲染貼文組件的函數，使用無限滾動 hook
  const renderPosts = () => {
    if (posts.length === 0) {
      return <EmptyState searchTerm={searchTerm} onClearSearch={handleClearSearch} />;
    }

    const PostsComponent = viewMode === "grid" ? PostsGrid : PostsList;
    
    return (
      <>
        <PostsComponent 
          posts={posts} 
          getCategoryColor={() => categoryColor} 
        />
        
        {/* 無限滾動觸發點 */}
        {hasMore && (
          <Box
            ref={setupObserver}
            sx={{
              height: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              my: 2,
            }}
          />
        )}
        
        {/* 載入更多指示器 */}
        {isLoadingMore && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 4,
            }}
          >
            <CircularProgress size={32} />
            <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary' }}>
              載入更多文章中...
            </Typography>
          </Box>
        )}
        
        {/* 沒有更多內容提示 */}
        {!hasMore && posts.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 4,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              已經到底了！沒有更多文章了 🎉
            </Typography>
          </Box>
        )}
      </>
    );
  };

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

      {renderPosts()}
    </Layout>
  );
}