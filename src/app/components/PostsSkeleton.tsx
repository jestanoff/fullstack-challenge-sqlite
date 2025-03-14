import { Box, Card, Skeleton } from "@mui/material";

const PostsSkeleton = ({ num }: { num: number }) => (
  <Box sx={{ width: "100%" }}>
    {[...Array(num)].map((_, index) => (
      <Card key={index} sx={{ display: "flex", flexDirection: "column", marginBottom: "30px", padding: "20px" }}>
        <Skeleton variant="rectangular" width="100%" height="20px" sx={{ marginBottom: "10px" }} />
        <Skeleton variant="rectangular" width="80%" height="20px" sx={{ marginBottom: "10px" }} />
        <Skeleton variant="rectangular" width="80%" height="20px" sx={{ marginBottom: "10px" }} />
        <Skeleton variant="rectangular" width="80%" height="20px" sx={{ marginBottom: "10px" }} />
      </Card>
    ))}
  </Box>
);

export default PostsSkeleton;
