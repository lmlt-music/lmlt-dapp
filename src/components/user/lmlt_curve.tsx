'use client';

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  TextField,
  CircularProgress,
  Avatar,
  Stack,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { UserComment as Comment } from "models/comments";
const StyledPage = styled(Box)({
  backgroundColor: "#121212",
  color: "white",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
});

const Header = styled(Box)({
  padding: "20px",
  backgroundColor: "#1e0739",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const BondingCurveBox = styled(Box)({
  marginTop: "20px",
  padding: "20px",
  backgroundColor: "#1d1d1d",
  borderRadius: "10px",
});

const CommentSection = styled(Box)({
  padding: "10px",
  backgroundColor: "#1d1d1d",
  borderRadius: "10px",
  marginTop: "20px",
});

const HolderDistribution = styled(Box)({
  marginTop: "20px",
  padding: "20px",
  backgroundColor: "#1d1d1d",
  borderRadius: "10px",
});

export default function LmltCurvePage() {
  const [activeTab, setActiveTab] = useState("comments");
  const [bondingCurveProgress, setBondingCurveProgress] = useState(66); // Mock value
  const [roadmapStage, setRoadmapStage] = useState("Q1 2024: Launch Features");
  const [holderDistribution, setHolderDistribution] = useState([
    { holder: "1. 9AFLi", percentage: 48.07 },
    { holder: "2. H5HUyZ", percentage: 2.88 },
    { holder: "3. 6Qy7Av", percentage: 2.55 },
  ]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch comments from Firebase
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentCollection = collection(db, "comments");
        const commentSnapshot = await getDocs(commentCollection);
        const commentList = commentSnapshot.docs.map((doc) => ({
          ...(doc.data() as Comment),
          id: doc.id,
        }));
        setComments(commentList);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, []);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      text: newComment,
      userId: "currentUserId", // Replace with actual user ID
      username: "currentUsername", // Replace with actual username
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "comments"), comment);
      setComments([comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const renderContent = () => {
    if (activeTab === "comments") {
      return (
        <CommentSection>
          <Typography variant="h6" mb={2}>
            Comments
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              backgroundColor: "#333",
              borderRadius: "10px",
              marginBottom: "15px",
              input: { color: "white" },
            }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#ff4081", textTransform: "none" }}
            onClick={handlePostComment}
          >
            Post Comment
          </Button>
          <Box mt={3}>
            {loadingComments ? (
              <CircularProgress />
            ) : (
              comments.map((comment, index) => (
                <Box key={index} mb={2} p={2} border="1px solid #333" borderRadius="10px">
                  <Typography>{comment.text}</Typography>
                  <Typography variant="caption" color="gray">
                    {new Date(comment.createdAt.seconds * 1000).toLocaleString()}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </CommentSection>
      );
    }

    if (activeTab === "trades") {
      return (
        <CommentSection>
          <Typography variant="h6" mb={2}>
            Trades
          </Typography>
          <Typography>Trade data and activity will be shown here.</Typography>
        </CommentSection>
      );
    }
  };

  return (
    <StyledPage>
      <Header>
        <Typography variant="h4" fontWeight="bold">
          Limelight (LMLT) Bonding Curve
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "#ff4081" }}>
          Buy LMLT
        </Button>
      </Header>

      <Container maxWidth="md">
        {/* Bonding Curve Progress */}
        <BondingCurveBox>
          <Typography variant="h6" mb={1}>
            Bonding Curve Progress
          </Typography>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                backgroundColor: "#ff4081",
                height: "20px",
                width: `${bondingCurveProgress}%`,
                borderRadius: "10px",
              }}
            />
            <Typography ml={2}>{bondingCurveProgress}%</Typography>
          </Box>
        </BondingCurveBox>

        {/* Roadmap Stage */}
        <BondingCurveBox>
          <Typography variant="h6" mb={1}>
            Current Roadmap Stage
          </Typography>
          <Typography>{roadmapStage}</Typography>
        </BondingCurveBox>

        {/* Holder Distribution */}
        <HolderDistribution>
          <Typography variant="h6" mb={1}>
            Holder Distribution
          </Typography>
          {holderDistribution.map((holder, index) => (
            <Typography key={index}>
              {holder.holder} - {holder.percentage}%
            </Typography>
          ))}
        </HolderDistribution>

        {/* Tabs for Comments and Trades */}
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          textColor="inherit"
          indicatorColor="primary"
          centered
        >
          <Tab value="comments" label="Comments" />
          <Tab value="trades" label="Trades" />
        </Tabs>

        {/* Tab Content */}
        {renderContent()}
      </Container>
    </StyledPage>
  );
}