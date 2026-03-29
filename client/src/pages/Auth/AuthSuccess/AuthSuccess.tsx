import { Flex, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("@jobmail:token", token);
      navigate("/applications");
    } else {
      navigate("/");
    }
  }, [searchParams, navigate]);

  return (
    <Flex>
      <Spin description="Loading" size="large"></Spin>
    </Flex>
  );
}
