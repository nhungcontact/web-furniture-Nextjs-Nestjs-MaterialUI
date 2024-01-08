import useBillTopCustomerOfMonth from "@/hooks/bills/useBillTopCustomerOfMonth";
import useUserDetail from "@/hooks/users/useUserDetail";
import { Button, Card, CardContent, Typography, styled } from "@mui/material";
// Styled component for the triangle shaped background image
const TriangleImg = styled("img")({
  right: 7,
  bottom: 0,
  height: 204,
  position: "absolute",
});

export default function Trophy() {
  const d = new Date();
  const month = d.getMonth();
  const { data: user } = useBillTopCustomerOfMonth(month + 1, 2023);
  const { data: userDetail } = useUserDetail(user?.user);
  //   const [editorContent, setEditorContent] = useState(
  //     "<p>Hello, <strong>Next.js</strong>!</p>",
  //   );

  return (
    <Card sx={{ position: "relative", overflow: "visible" }}>
      <CardContent>
        <Typography variant="h6">
          Congratulations {userDetail?.username ?? "-"}! 🥳
        </Typography>
        <Typography
          variant="body1"
          sx={{ letterSpacing: "0.25px" }}
        >
          Best seller of the month {month + 1}
        </Typography>
        <Typography
          variant="h5"
          sx={{ my: 2, color: "primary.main" }}
        >
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "vnd",
          }).format(user?.totalAmount as number) ?? "-"}
        </Typography>
        <Button
          size="small"
          variant="contained"
        >
          View Sales
        </Button>
        <TriangleImg
          alt="triangle background"
          src={`/images/pose_f9.png`}
        />
        {/* <TrophyImg
          alt="trophy"
          src="/images/misc/trophy.png"
        /> */}
      </CardContent>
    </Card>
  );
}
