export const createUsers = async (name, firstName, id, img, facebook, instagram) => {
  try {
    const data = await fetch("http://localhost:3000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, firstName, id, img, facebook, instagram}),
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
