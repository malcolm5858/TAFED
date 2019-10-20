// import React from "react";
// import AppBar from "@material-ui/core/AppBar";
// import Button from "@material-ui/core/Button";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Box from "@material-ui/core/Box";
// import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Match from "./Match";
// import { Container } from "@material-ui/core";

// export default class Home extends React.Component {
//   state = {
//     login: false,
//     register: false
//   };

//   render() {
//     const classes = makeStyles(theme => ({
//       "@global": {
//         body: {
//           backgroundColor: theme.palette.common.white
//         },
//         ul: {
//           margin: 0,
//           padding: 0
//         },
//         li: {
//           listStyle: "none"
//         }
//       },
//       appBar: {
//         borderBottom: `1px solid ${theme.palette.divider}`
//       },
//       toolbar: {
//         flexWrap: "wrap"
//       },
//       toolbarTitle: {
//         flexGrow: 1
//       },
//       link: {
//         margin: theme.spacing(1, 1.5)
//       },
//       heroContent: {
//         padding: theme.spacing(8, 0, 6)
//       },
//       root: {
//         flexGrow: 1
//       },
//       menuButton: {
//         marginRight: theme.spacing(3)
//       },
//       title: {
//         flexGrow: 1
//       }
//     }));
//     const { login } = this.state;
//     const { register } = this.state;
//     if (login) {
//       return <Redirect to="/login" />;
//     }
//     if (register) {
//       return <Redirect to="/Register" />;
//     }
//     return (
//       <React.Fragment>
//         <AppBar position="fixed" color="secondary">
//           <Toolbar>
//             <Typography variant="h3" className={classes.title}>
//               <Box fontFamily="sans-serif" fontSize="h3.fontSize" m={2}>
//                 TAFED
//               </Box>
//             </Typography>
//             <Link to="/Login" style={{ textDecoration: "none" }}>
//               <Button color="Black">Login</Button>
//             </Link>
//             <Link to="/Register" style={{ textDecoration: "none" }}>
//               <Button>Register</Button>
//             </Link>
//           </Toolbar>
//         </AppBar>
//         <Container
//           maxWidth="sm"
//           component="main"
//           className={classes.heroContent}>
//           <Typography
//             component="h1"
//             variant="h2"
//             align="center"
//             color="textPrimary"
//             gutterBottom>
//             Pricing
//           </Typography>
//         </Container>
//       </React.Fragment>
//     );
//   }
// }
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Match from "./Match";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  }
}));

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support"
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined"
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support"
    ],
    buttonText: "Get started",
    buttonVariant: "contained"
  },
  {
    title: "Enterprise",
    price: "30",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support"
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined"
  }
];
const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"]
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one"
    ]
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource"
    ]
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"]
  }
];

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}>
            TAFED
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              href="/Register"
              className={classes.link}>
              Register
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="/login"
              className={classes.link}>
              Login
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
    </React.Fragment>
  );
}
