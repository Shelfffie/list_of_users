import { useState } from "react";

export default function CreateUser() {
  return (
    <>
      <h1>Create new user:</h1>
      <form>
        <p>Name:</p>
        <input type="text" placeholder="Name" />
        <p>Last name:</p>
        <input type="text" placeholder="Last name" />
        <p>Email:</p>
        <input type="text" placeholder="Email" />
        <p>Phone Number:</p>
        <input type="number" placeholder="Phone number" />
        <p>Birthday date:</p>
        <input type="date" placeholder="Birthday" />
        <button type="submit">Create user</button>
      </form>
    </>
  );
}
