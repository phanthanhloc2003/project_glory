import { useEffect, useState } from "react";
import { get } from "../../utils/axiosConfig";

export type User = {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
};

const HomePage = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo") || "");
        const response = await get<User>(`/user-information/${user.phone}`);
        const { first_name = '', last_name, phone } = response.data;
        setUser({ firstName: first_name, lastName: last_name, phone });
      } catch (err: any) {
        setError(err?.message);
        alert(err?.message);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
