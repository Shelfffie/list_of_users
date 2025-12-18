import { useForm } from "react-hook-form";
import axios from "axios";
import { userValues } from "./type";

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userValues>();

  const onValid = async (data: userValues) => {
    try {
      const response = await axios.post("http://localhost:5000/users", data);
      if (response.status === 201) {
        alert("Користувача успішно створено!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error:", error.response?.data);
      } else if (error instanceof Error) {
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <>
      <h1>Create new user:</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <p>Name:</p>
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "The field must be filled in!",
            minLength: { value: 2, message: "Must be at least 2 symbols!" },
          })}
        />
        <p>{errors.name?.message}</p>
        <p>Last name:</p>
        <input
          type="text"
          placeholder="Last name"
          {...register("lastName", {
            required: "The field must be filled in!",
            minLength: { value: 2, message: "Must be at least 2 symbols!" },
          })}
        />
        <p>{errors.lastName?.message}</p>
        <p>Email:</p>
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "The field must be filled in!",
            minLength: { value: 4, message: "Must be at least 4 symbols!" },
            pattern: {
              value: /^[\w.]+@[a-z]+\.[a-z]{2,5}$/,
              message: "Incorrect email address!",
            },
          })}
        />
        <p>{errors.email?.message}</p>
        <p>Phone Number:</p>
        <input
          type="type"
          placeholder="Phone number"
          {...register("phone", {
            required: "The field must be filled in!",
            validate: (value) =>
              value.length === 13 ||
              "Incorrect number length. Must be 13 symbols!",
            pattern: {
              value: /^\+380\d{9}/,
              message: "Incorrect phone number.",
            },
          })}
        />
        <p>{errors.phone?.message}</p>
        <p>Birthday date:</p>
        <input
          type="date"
          placeholder="Birthday"
          {...register("birthday", {
            required: "The field must be filled in!",
          })}
        />
        <p>{errors.birthday?.message}</p>
        <button type="submit">Create user</button>
      </form>
    </>
  );
}
