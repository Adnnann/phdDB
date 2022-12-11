import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../features/usersManagementSlice";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import userImagePlaceholder from "../../assets/userImgPlaceholder.png";
import { makeStyles } from "@mui/styles";
import TextareaAutosize from "@mui/base/TextareaAutosize";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "100%",
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
    fontSize: "18px",
  },
  textField: {
    width: "100%",
  },
  save: {
    marginBottom: theme.spacing(2),
    minWidth: "120px",
    marginRight: theme.spacing(2),
  },
  cancel: {
    marginBottom: theme.spacing(2),
    minWidth: "120px",
  },
  signin: {
    margin: "auto",
    marginBottom: theme.spacing(1),
  },
  userImagePlaceholder: {
    width: 130,
    marginTop: "20px",
  },
  uploadPhoto: {
    minWidth: "125px",
  },
}));
const ViewArticle = () => {
  const classes = useStyles();
  const userToView = useSelector(getUserProfile);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    quotes: "",
    email: "",
    error: "",
  });

  useEffect(() => {
    setValues({
      title: userToView.title,
      quotes: userToView.quotes,
      myThoughts: userToView.myThoughts,
    });
  }, []);

  const redirectToDashboard = () => {
    navigate("/");
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <h2 style={{ textAlign: "left", marginLeft: "10px" }}>
          {values.title}
        </h2>

        <p
          style={{
            textAlign: "left",
            marginLeft: "10px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Quotes:
        </p>

        <p>
          {values.quotes
            ? values.quotes.split("=").map((item) => (
                <p
                  style={{
                    textAlign: "left",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  {item.replace(/[^\x00-\x7F]/g, "")}
                </p>
              ))
            : null}
        </p>

        <br />
        {userToView.mainFindings && (
          <>
            <TextField
              style={{ marginTop: "0" }}
              multiline={4}
              id="title"
              className={classes.textField}
              value={values.mainFindings ? values.mainFindings : ""}
              margin="normal"
            />
            <br />
          </>
        )}
        <br />
        {userToView.scale && (
          <>
            <TextField
              style={{ marginTop: "0" }}
              multiline={4}
              id="title"
              className={classes.textField}
              value={values.scale ? values.scale : ""}
              margin="normal"
            />
            <br />
          </>
        )}
        <br />
        {userToView.myThoughts && (
          <>
            <TextField
              style={{ marginTop: "0" }}
              multiline={4}
              id="title"
              className={classes.textField}
              value={values.myThoughts ? values.myThoughts : ""}
              margin="normal"
            />
            <br />
          </>
        )}
        <Button variant="contained" onClick={() => navigate("allUsers")}>
          Return
        </Button>
      </Grid>
    </Grid>
  );
};

export default ViewArticle;
