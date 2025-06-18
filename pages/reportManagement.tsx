import React, { SyntheticEvent, useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Grid,
  IconButton,
  Link,
  Paper,
  Divider,
  Stack,
  FormControlLabel,
  Checkbox,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Article as ArticleIcon,
  Comment as CommentIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  OpenInNew as OpenInNewIcon,
  Close as CloseIcon,
  NotificationImportant as NotificationIcon,
  Send as SendIcon,
  Warning,
  Sort
} from '@mui/icons-material';
import Banner from '@/components/common/Banner';
import Layout from '@/components/layout/Layout';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ReportAPI from '@/services/Report/ReportAPI';

type ReportType = {
  id: number;
  type: string;
  content: string;
  reporter: string;
  reportedContent: string;
  contentLink: string;
  status: string;
  reportDate: string;
  author: string;
  created_at: string;
  target_type: string;
  reasonLabel: string;
  description?: string;
  targetText: string;
  reporterName: string;
  targetLink: string;
}

const ReportManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [reviewDecision, setReviewDecision] = useState<'accepted' | 'rejected' | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [articleReports, setArticleReports] = useState<ReportType[]>([]);
  const [commentReports, setCommentReports] = useState<ReportType[]>([]);
  const title = "檢舉管理";

  const fetchData = async () => {
    const res = await ReportAPI.getReportList();
    console.log(res);
    setArticleReports(res.data.filter(report => report.target_type === 'post'));
    setCommentReports(res.data.filter(report => report.target_type === 'comment'));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'warning',
          text: '待審核',
          icon: <ScheduleIcon sx={{ fontSize: 16 }} />,
          bgColor: '#fff3cd',
          textColor: '#856404'
        };
      case 'accepted':
        return {
          color: 'success',
          text: '檢舉成立',
          icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
          bgColor: '#d4edda',
          textColor: '#155724'
        };
      case 'rejected':
        return {
          color: 'error',
          text: '檢舉不成立',
          icon: <CancelIcon sx={{ fontSize: 16 }} />,
          bgColor: '#f8d7da',
          textColor: '#721c24'
        };
      default:
        return {
          color: 'default',
          text: '未知',
          icon: <ScheduleIcon sx={{ fontSize: 16 }} />,
          bgColor: '#e2e3e5',
          textColor: '#383d41'
        };
    }
  };

  type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

  const typeColors: Record<string, { color: ChipColor; variant: 'outlined' | 'filled' }> = {
    '不當內容': { color: 'error', variant: 'outlined' },
    '仇恨言論': { color: 'warning', variant: 'outlined' },
    '垃圾訊息': { color: 'secondary', variant: 'outlined' },
    '人身攻擊': { color: 'error', variant: 'filled' }
  };

  const getTypeColor = (type: string) => {
    return typeColors[type] || { color: 'default', variant: 'outlined' };
  };

  // const currentReports = activeTab === 0 ? articleReports : commentReports;

  const handleReviewReport = async (id: string) => {
    await ReportAPI.reviewReport(id, reviewDecision);
    window.location.reload();
    if (selectedReport && reviewDecision) {
      console.log(`檢舉 ${selectedReport.id} 審核結果: ${reviewDecision}`);
      setOpenDialog(false);
      setSelectedReport(null);
      setReviewDecision(null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTabChange = (event: SyntheticEvent, newValue: any) => {
    setActiveTab(newValue);
  };

  const openReportDialog = (report: ReportType) => {
    setSelectedReport(report);
    setReviewDecision(null);
    setOpenDialog(true);
  };

  const handleCheckboxChange = (decision: 'accepted' | 'rejected') => {
    setReviewDecision(reviewDecision === decision ? null : decision);
  };

  const filterReportsByStatus = (reports: ReportType[]) => {
    if (statusFilter === 'all') {
      return reports;
    }
    return reports.filter(report => report.status === statusFilter);
  };

  const allCurrentReports = activeTab === 0 ? articleReports : commentReports;
  const currentReports = filterReportsByStatus(allCurrentReports);

  const handleStatusFilterChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  return (
    <Layout title={title}>
      <Box>
        {/* Header Banner */}
        <Banner
          title={title}
          content={""}
          avatarUrl={""}
          textColor={""}
          icon={Warning}
        >
        </Banner>

        <Box>
          {/* Tab Navigation */}
          <Paper sx={{ mb: 3, borderRadius: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  py: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                },
              }}
            >
              <Tab
                icon={<ArticleIcon />}
                iconPosition="start"
                label="文章檢舉"
                sx={{ borderRadius: '12px 0 0 12px' }}
              />
              <Tab
                icon={<CommentIcon />}
                iconPosition="start"
                label="留言檢舉"
                sx={{ borderRadius: '0 12px 12px 0' }}
              />
            </Tabs>
          </Paper>

          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <FormControl size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: '#0ea5e9',
                  },
                },
              }}>
              <InputLabel id="status-filter-label">篩選狀態</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="篩選狀態"
                onChange={handleStatusFilterChange}
                sx={{ borderRadius: 2 }}
                startAdornment={
                  <Sort sx={{ fontSize: 18, mr: 0.5, color: '#0ea5e9' }} />
                }
              >
                <MenuItem value="all">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    全部狀態
                  </Box>
                </MenuItem>
                <MenuItem value="pending">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ScheduleIcon sx={{ fontSize: 16, color: '#856404' }} />
                    待審核
                  </Box>
                </MenuItem>
                <MenuItem value="accepted">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon sx={{ fontSize: 16, color: '#155724' }} />
                    成立
                  </Box>
                </MenuItem>
                <MenuItem value="rejected">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CancelIcon sx={{ fontSize: 16, color: '#721c24' }} />
                    不成立
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Reports List */}
          <Stack spacing={3}>
            {currentReports.length > 0 ? (
              currentReports.map((report) => {
                const statusConfig = getStatusConfig(report.status);
                const typeConfig = getTypeColor(report.type);

                return (
                  <Card key={report.id} sx={{ overflow: 'visible' }}>
                    <CardContent sx={{ p: 3 }}>
                      {/* Header */}
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={report.reasonLabel}
                            color={typeConfig.color}
                            size="small"
                          />
                          <Chip
                            icon={statusConfig.icon}
                            label={statusConfig.text}
                            sx={{
                              bgcolor: statusConfig.bgColor,
                              color: statusConfig.textColor,
                              '& .MuiChip-icon': { color: statusConfig.textColor }
                            }}
                            size="small"
                          />
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5} color="text.secondary">
                          <CalendarIcon sx={{ fontSize: 16 }} />
                          <Typography variant="body2">{new Date(report.created_at).toLocaleDateString()}</Typography>
                        </Stack>
                      </Stack>

                      {/* Content */}
                      <Grid container spacing={3} mb={3}>
                        <Grid>
                          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                            檢舉內容
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {report.description}
                          </Typography>
                        </Grid>
                        <Grid>
                          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                            被檢舉{activeTab === 0 ? '文章' : '留言'}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {report.targetText}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Divider sx={{ my: 2 }} />

                      {/* Footer */}
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={3}>
                          <Stack direction="row" alignItems="center" spacing={0.5} color="text.secondary">
                            <PersonIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2">檢舉人: {report.reporterName}</Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Button
                            startIcon={<OpenInNewIcon />}
                            size="small"
                            component={Link}
                            href={report.targetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ textDecoration: 'none' }}
                          >
                            查看原文
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={<VisibilityIcon />}
                            size="small"
                            onClick={() => openReportDialog(report)}
                          >
                            {report.status === 'pending' ? '審核' : '查看詳情'}
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card sx={{ textAlign: 'center', py: 8 }}>
                <CardContent>
                  <NotificationIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    目前沒有檢舉
                  </Typography>
                  <Typography variant="body2" color="text.disabled">
                    目前沒有{activeTab === 0 ? '文章' : '留言'}檢舉需要處理
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Box>

        {/* Report Detail Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold">
                檢舉審核 - {selectedReport?.reasonLabel}
              </Typography>
              <IconButton onClick={() => setOpenDialog(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>

          <DialogContent sx={{ px: 3, py: 2 }}>
            {selectedReport && (
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    檢舉內容
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="body2">{selectedReport.description}</Typography>
                  </Paper>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    被檢舉{activeTab === 0 ? '文章' : '留言'}
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="body2">{selectedReport.targetText}</Typography>
                  </Paper>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    原文連結
                  </Typography>
                  <Link
                    href={selectedReport.targetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    <OpenInNewIcon sx={{ fontSize: 16 }} />
                    {selectedReport.targetLink}
                  </Link>
                </Box>

                <Grid container spacing={2}>
                  <Grid>
                    <Typography variant="body2" fontWeight="bold">檢舉人</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedReport.reporterName}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="body2" color="text.secondary">
                      {selectedReport.author}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="body2" fontWeight="bold">檢舉日期</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(selectedReport.created_at).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Review Section */}
                {selectedReport.status === 'pending' && (
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                      審核結果
                    </Typography>
                    <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                      <Stack spacing={1}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={reviewDecision === 'accepted'}
                              onChange={() => handleCheckboxChange('accepted')}
                              icon={<CheckCircleIcon sx={{ color: 'grey.400' }} />}
                              checkedIcon={<CheckCircleIcon sx={{ color: 'success.main' }} />}
                            />
                          }
                          label="檢舉成立"
                          sx={{ color: reviewDecision === 'accepted' ? 'success.main' : 'text.primary' }}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={reviewDecision === 'rejected'}
                              onChange={() => handleCheckboxChange('rejected')}
                              icon={<CancelIcon sx={{ color: 'grey.400' }} />}
                              checkedIcon={<CancelIcon sx={{ color: 'error.main' }} />}
                            />
                          }
                          label="檢舉不成立"
                          sx={{ color: reviewDecision === 'rejected' ? 'error.main' : 'text.primary' }}
                        />
                      </Stack>
                    </Paper>
                  </Box>
                )}
              </Stack>
            )}
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            {selectedReport?.status === 'pending' && (
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => handleReviewReport(selectedReport.id)}
                disabled={!reviewDecision}
                color={"primary"}
              >
                送出審核結果
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Layout >
  );
};

export default ReportManagement;