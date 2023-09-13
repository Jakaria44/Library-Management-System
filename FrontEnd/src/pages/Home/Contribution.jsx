import { Facebook, GitHub, LinkedIn, Mail, YouTube } from "@mui/icons-material";
import { Box, Divider, Grid, Link, Paper, Typography } from "@mui/material";

export default function Contribution() {
  return (
    <Paper elevation={24} sx={{ padding: 3, marginY: 3 }}>
      <Typography textAlign="center" variant="body1" fontSize={30} gutterBottom>
        Developed by
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        spacing={16}
      >
        <Grid item xs>
          <Typography
            textAlign="center"
            fontSize={25}
            variant="body2"
            gutterBottom
          >
            Frontend
          </Typography>
          <Grid
            container
            direction="row"
            // padding={0}
            justifyContent="space-between"
          >
            <Grid item xs={6}>
              <img
                src="https://avatars.githubusercontent.com/Jakaria44"
                alt="GitHub Avatar"
                height={160}
                width={160}
                style={{ marginRight: "8px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={16}
                gutterBottom
              >
                Md. Jakaria Hossain
              </Typography>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={16}
                gutterBottom
              >
                Student ID: 2005026
              </Typography>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={16}
                gutterBottom
              >
                CSE, BUET
              </Typography>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={16}
                gutterBottom
              >
                Contact:
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Link
                  href="mailto:mdjakaria442020@gmail.com"
                  underline="none"
                  color="text.primary"
                >
                  <Mail />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.github.com/Jakaria44"
                  underline="none"
                  color="text.primary"
                >
                  <GitHub />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.youtube.com/@jakariahossain1A"
                  underline="none"
                  color="text.primary"
                >
                  <YouTube />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/jakaria.hossain.359126"
                  underline="none"
                  color="text.primary"
                >
                  <Facebook />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/md-jakaria-hossain-65007025b"
                  underline="none"
                  color="text.primary"
                >
                  <LinkedIn />
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Divider orientation="vertical" height={300} variant="inset" />
        <Grid item xs>
          <Typography
            textAlign="center"
            fontSize={25}
            variant="body2"
            gutterBottom
          >
            Backend
          </Typography>
          <Grid
            container
            direction="row"
            // padding={0}
            justifyContent="space-between"
          >
            <Grid item xs={6}>
              <img
                src="https://avatars.githubusercontent.com/AN-SWAPNIL"
                alt="GitHub Avatar"
                height={160}
                width={160}
                style={{ marginRight: "8px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={16}
                gutterBottom
              >
                Ahmmad Nur Swapnil
              </Typography>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={16}
                gutterBottom
              >
                Student ID: 2005009
              </Typography>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={16}
                gutterBottom
              >
                CSE, BUET
              </Typography>
              <Typography
                textAlign="left"
                variant="body2"
                fontSize={16}
                gutterBottom
              >
                Contact:
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Link
                  href="mailto:a.n.swapnil2003@gmail.com"
                  underline="none"
                  color="text.primary"
                >
                  <Mail />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.github.com/AN-SWAPNIL"
                  underline="none"
                  color="text.primary"
                >
                  <GitHub />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.youtube.com/@an_swapnil9029"
                  underline="none"
                  color="text.primary"
                >
                  <YouTube />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/a.n.swapnil"
                  underline="none"
                  color="text.primary"
                >
                  <Facebook />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/md-jakaria-hossain-65007025b"
                  underline="none"
                  color="text.primary"
                >
                  <LinkedIn />
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
