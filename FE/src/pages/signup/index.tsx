import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { post } from "../../utils/axiosConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = yup.object().shape({
  lastName: yup.string().required("Last name is required"),
  firstName: yup.string().required("First name is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d+$/, "Phone must be a number"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const result = post("/sign-in", data);
      const user = (await result).data;
      console.log(user);
      navigate("/signin");
    } catch (error: any) {
      alert(error?.message || "Lỗi Call API");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="FisrtName"
            name="firstName"
            autoComplete="firstName"
            autoFocus
          />
          <TextField
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Lastname"
            name="lastName"
            autoComplete="lastName"
            autoFocus
          />
          <TextField
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            autoFocus
          />
          <TextField
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sing up
          </Button>
        </form>
      </div>
    </Container>
  );
}
