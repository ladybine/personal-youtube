export const createUsers = async (name, firstName, id, img) => {
  try {
    const data = await fetch("http://localhost:3000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, firstName, id, img }),
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
