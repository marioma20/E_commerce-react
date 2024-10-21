import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/AuthSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInType } from "@validations/SignInScema";

const useLogin = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { error, loading, accessToken } = useAppSelector((state) => state.AuthReducer);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitForm: SubmitHandler<signInType> = async (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);
  

  return {
    error,
    loading,
    accessToken,
    formErrors,
    searchParams,
    register,
    handleSubmit,
    submitForm,
  };
};

export default useLogin;



