import { apiAxios } from "@/services/axios";
import { useState } from "react";
import { toast } from "react-toastify";

// TODO all
interface CartProps {
  quantity: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<null | CartProps>(null);

  const update = async () => {
    await apiAxios
      .get("/cart")
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        setCart(null);
        console.error(error);
        toast.error("Error fetching cart");
      });
  };

  return { cart, update };
};
