import db from "../firebase.js";

const addSearchField = async () => {
  try {
    console.log("Fetching users...");
    const snapshot = await db.ref("users").once("value");
    console.log("Users fetched");

    const users = snapshot.val();

    console.log("Preparing update...");
    const update = {};
    for (const [id, user] of Object.entries(users)) {
      if (user.search) continue;
      const search = [user.name, user.lastName, user.email, user.phone]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      update[`users/${id}/search`] = search;
    }

    if (Object.keys(update).length === 0) {
      console.log("All users already have search field");
      return;
    }

    console.log(`Updating ${Object.keys(update).length} users...`);
    await db.ref().update(update);
    console.log("Finished!...");
  } catch (error) {
    console.log("Migration failed:", error);
  }
};

addSearchField();
