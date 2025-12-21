import { useForm } from "react-hook-form";
import axios from "axios";
import { userValues } from "./type";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userValues>();
  const navigate = useNavigate();

  const onValid = async (data: userValues) => {
    try {
      const response = await axios.post("http://localhost:5000/users", data);
      if (response.status === 201) {
        alert("Користувача успішно створено!");
        reset();
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
    <div className="ms-4">
      <p className="btn btn-link" onClick={() => navigate(-1)}>
        Повернутися
      </p>
      <h1 className="p-4">Create new user:</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <p>Name:</p>
        <input
          type="text"
          placeholder="Name"
          className="mb-4 form-control w-25"
          {...register("name", {
            required: "The field must be filled in!",
            minLength: { value: 2, message: "Must be at least 2 symbols!" },
          })}
        />
        <p className="text-danger">{errors.name?.message}</p>
        <p>Last name:</p>
        <input
          type="text"
          placeholder="Last name"
          className="mb-4 form-control w-25"
          {...register("lastName", {
            required: "The field must be filled in!",
            minLength: { value: 2, message: "Must be at least 2 symbols!" },
          })}
        />
        <p className="text-danger">{errors.lastName?.message}</p>
        <p>Email:</p>
        <input
          type="text"
          placeholder="Email"
          className="mb-4 form-control w-25"
          {...register("email", {
            required: "The field must be filled in!",
            minLength: { value: 4, message: "Must be at least 4 symbols!" },
            pattern: {
              value: /^[\w.]+@[a-z]+\.[a-z]{2,5}$/,
              message: "Incorrect email address!",
            },
          })}
        />
        <p className="text-danger">{errors.email?.message}</p>
        <p>Phone Number:</p>
        <input
          type="type"
          placeholder="Phone number"
          className="mb-4 form-control w-25"
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
        <p className="text-danger">{errors.phone?.message}</p>
        <p>Birthday date:</p>
        <input
          type="date"
          placeholder="Birthday"
          className="mb-4 form-control w-25"
          {...register("birthday", {
            required: "The field must be filled in!",
          })}
        />
        <p className="text-danger">{errors.birthday?.message}</p>
        <button type="submit" className="btn btn-primary m-4">
          Create user
        </button>
      </form>
    </div>
  );
}
