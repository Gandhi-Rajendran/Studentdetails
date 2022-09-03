import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MenuItem, Checkbox, TextField, Avatar } from "@mui/material";
import { StylButton, StyledStack, StyledForm } from "./Styled";
import { useState } from "react";

const date = new Date().toISOString("2022-01-1").slice(0, 10);

const dobValidation = (value) => {
  if (value >= "1990-01-01" && value <= date) {
    return "Eligible Date of birth from 1990 to Current Date.";
  }
};

const schema = yup.object({
  name: yup
    .string()
    .required("Name is Required!")
    .test(
      "name",
      "Min 6 and Max 18 characters required",
      (val) => val.length >= 6 && val.length <= 18
    ),
  email: yup
    .string()
    .matches(/^[\w-(.?)]+@([\w-]+\.)+[\w-]{2,4}$/g, "Enter valid email address")
    .required("Email is Required!"),
  password: yup
    .string()
    .required("Password is Required!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/g,
      "Min 6 and Max 12 characters atleast one letter,one number and no special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is Required")
    .oneOf([yup.ref("password"), null], "Password doesn't match"),
  age: yup
    .number()
    .transform((val, orig) => (orig === "" ? undefined : val))
    .required("Age is Required")
    .typeError("Age must be a number")
    .positive("Age must be positive")
    .integer("Age must be a Integer")

    .test(
      "Age check",
      "Age must be 18 above and 60 below",
      (val) => val >= 18 && val <= 60
    ),
  gender: yup.string().required("Gender is Required"),
  phoneNo: yup
    .string()
    .required("Phone No is Required!")
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/gm,
      "Phone No is not valid"
    ),
  dob: yup
    .string()
    .required("Date of Birth is Required!")
    .test("DOB", "Eligible Date of birth from 1990 to current day", (value) =>
      dobValidation(value)
    ),
  checkbox: yup.boolean().oneOf([true], "Must Accept the Terms and Conditions"),

  file: yup
    .mixed()
    .test("required", "photo is required", (value) => {
      console.log(value);
      return value.length > 0;
    })
    .test("fileSize", "File Size is too large", (value) => {
      return value.length && value[0].size <= 5242880;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return (
        value.length &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
      );
    }),
});

const StudentForm = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [gender, setGender] = useState("");
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onSubmit = (data) => {
    setIsCheck(false);
    setGender("");
    reset();
    alert(JSON.stringify(data));
  };

  console.log(errors);
  const onSelect = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledStack>
        <TextField
          label="Name"
          variant="outlined"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name")}
        />
        <TextField
          error={!!errors.email}
          label="Email"
          variant="outlined"
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          type="password"
          error={!!errors.password}
          label="password"
          variant="outlined"
          helperText={errors.password?.message}
          {...register("password")}
        />
        <TextField
          type="password"
          error={!!errors.confirmPassword}
          label="Confirm Password"
          variant="outlined"
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <TextField
          error={!!errors.age}
          label="Age"
          variant="outlined"
          helperText={errors.age?.message}
          {...register("age")}
        />
        <TextField
          label="Gender"
          select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          error={errors.gender}
          helperText={errors.gender?.message}
          inputProps={register("gender")}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          error={!!errors.phoneNo}
          label="Phone No"
          variant="outlined"
          helperText={errors.phoneNo?.message}
          {...register("phoneNo")}
        />
        <TextField
          error={!!errors.dob}
          type="date"
          label="Date of Birth"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          helperText={errors.dob?.message}
          {...register("dob")}
        />
        <TextField
          error={!!errors.file}
          InputLabelProps={{ shrink: true }}
          type="file"
          label="Upload"
          variant="outlined"
          helperText={errors.file?.message}
          {...register("file")}
          onChange={onSelect}
        />

        <Avatar
          alt="Profile.pic"
          src={file}
          sx={{ width: "3rem", height: "3rem" }}
        />
      </StyledStack>
      <Checkbox
        checked={isCheck}
        onClick={() => setIsCheck(!isCheck)}
        {...register("checkbox")}
      />
      I Accept the Terms and Conditions.
      {errors.checkbox && <p>{errors.checkbox.message}</p>}
      <StylButton type="submit" variant="contained" fullWidth>
        Submit
      </StylButton>
    </StyledForm>
  );
};

export default StudentForm;
