import { Typography } from "@mui/material";
import CustomDialog from "../Common/CustomDialog";
import {
  ArrowBack,
  MilitaryTechOutlined,
  AttachMoneyOutlined,
} from "@mui/icons-material";
import colors from "../../Utils/colors";
import CustomTextField from "../Common/CustomTextField";
import CustomButton from "../Common/CustomButton";
import { allRoutes } from "../../Routes/AllRoutes";
import { useRouter } from "next/navigation";
import useLoginStyles from "../Login/loginStyles";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { validateEmail } from "@/app/Utils/utils";

interface DataProps {
  city?: string;
  username?: string;
  name?: string;
  email?: string;
}

interface GameUserDialogProps {
  open: boolean;
  onUpdate: (data: DataProps) => void;
  finishingVariant?: boolean;
}

const GameUserDialog = ({
  open,
  onUpdate,
  finishingVariant = false,
}: GameUserDialogProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { IconSquareBox } = useLoginStyles();

  const [data, setData] = useState<DataProps>({
    city: "",
    username: "",
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<DataProps>({
    city: "",
    username: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (open) {
      setData({ city: "", username: "", name: "", email: "" });
      setErrors({ city: "", username: "", name: "", email: "" });
    }
  }, [open]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateData = () => {
    const updatedErrors: DataProps = { ...errors };

    if (finishingVariant) {
      updatedErrors.name = data.name ? "" : "Name cannot be empty";
      updatedErrors.email = validateEmail(data.email);
    } else {
      updatedErrors.username = data.username
        ? ""
        : "Game play name cannot be empty";
      updatedErrors.city = data.city ? "" : "City cannot be empty";
    }

    setErrors(updatedErrors);
    return !Object.values(updatedErrors).find(Boolean);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateData()) return;

    const payload = finishingVariant
      ? { name: data.name, email: data.email }
      : { username: data.username, city: data.city };

    onUpdate(payload);
  };

  const handleBack = () => {
    router.push(allRoutes.HOME);
  };

  return (
    <CustomDialog open={open} scrollType='body'>
      <IconSquareBox>
        {finishingVariant ? (
          <AttachMoneyOutlined fontSize='large' />
        ) : (
          <MilitaryTechOutlined fontSize='large' />
        )}
      </IconSquareBox>

      <Typography variant='h2' my={16} textAlign='center'>
        {finishingVariant ? t("Almost there!") : t("Let's Get Started!")}
      </Typography>

      <Typography
        fontSize={16}
        textAlign='center'
        mb={32}
        color='text.secondary'
      >
        {finishingVariant
          ? t("You're just one step away from winning the prize!")
          : t(
              "Ready to win $25 and prove you're Canada's best? Enter your details to begin!"
            )}
      </Typography>

      <form onSubmit={handleSubmit}>
        {finishingVariant ? (
          <>
            <CustomTextField
              required
              name='name'
              label='Your Name'
              bottom={16}
              value={data.name}
              onChange={handleOnChange}
              error={errors.name}
            />
            <CustomTextField
              required
              type='email'
              name='email'
              label='Email Address'
              bottom={16}
              value={data.email}
              onChange={handleOnChange}
              error={errors.email}
            />
          </>
        ) : (
          <>
            <CustomTextField
              required
              name='username'
              label='Game play name'
              bottom={16}
              value={data.username}
              onChange={handleOnChange}
              error={errors.username}
            />
            <CustomTextField
              required
              name='city'
              label='City'
              bottom={16}
              value={data.city}
              onChange={handleOnChange}
              error={errors.city}
            />
          </>
        )}

        <CustomButton fullWidth type='submit'>
          {finishingVariant ? t("Enter to Win") : t("Let's Go")}
        </CustomButton>
      </form>

      <CustomButton
        fullWidth
        variant='text'
        startIcon={<ArrowBack />}
        onClick={handleBack}
        sx={{ color: colors.text, mt: 18, py: 5 }}
      >
        {t("Back to Home")}
      </CustomButton>
    </CustomDialog>
  );
};

export default GameUserDialog;
