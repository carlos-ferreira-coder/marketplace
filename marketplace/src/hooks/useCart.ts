import { apiAxios } from "@/services/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// TODO types
interface CartProps {
  quantity: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<null | CartProps>(null);

  useEffect(() => {
    update();
  }, []);

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
