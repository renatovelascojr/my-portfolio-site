import { useState } from "react";
import { supabase } from "../utils/supabaseClient.ts"; // adjust path if needed

const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const submit = async (url, data) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          first_name: data.firstName,
          email: data.email,
          type: data.type,
          comment: data.comment,
        },
      ]);

      if (error) throw error;

      setResponse({
        type: "success",
        message: `Thanks for your submission ${data.firstName}, we will get back to you shortly!`,
      });
    } catch (error) {
      console.error("Supabase insert error:", error);
      setResponse({
        type: "error",
        message: "Something went wrong, please try again later!",
      });
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, response, submit };
};

export default useSubmit;