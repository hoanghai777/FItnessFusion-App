import { date, number, object, string } from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signUpSchema = object({
  phone: string()
    // .length(10, "Số điện thoại không đúng")
    .matches(phoneRegExp, "Số điện thoại không đúng")
    .required(),
  password: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
  repassword: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
});

export const fillProfileSchema = object({
  fullname: string().required("Bạn phải điền đầy đủ tên"),
  gender: string(),
  weight: number(),
  height: number(),
  age: number(),
});

export const changePasswordSchema = object({
  password: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
  newPassword: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
  reNewPassword: string().min(8, "Mật khẩu phải tối thiểu 8 ký tự").required(),
});

export function onInputChange<FieldType>(
  field: keyof FieldType,
  setDataForm: any,
  dataForm: FieldType
) {
  return function (value: any) {
    setDataForm({
      ...dataForm,
      [field]: value,
    });
  };
}

export const convertDaytoName = (dayId: string) => {
  switch (dayId) {
    case "0":
      return "Chủ nhật";
    case "1":
      return "Thứ 2";
    case "2":
      return "Thứ 3";
    case "3":
      return "Thứ 4";
    case "4":
      return "Thứ 5";
    case "5":
      return "Thứ 6";
    case "6":
      return "Thứ 7";
    default:
      return "";
  }
};
export const convertSessionToName = (dayId: string) => {
  switch (dayId) {
    case "0":
      return "Bữa sáng";
    case "1":
      return "Bữa trưa";
    case "2":
      return "Bữa tối";
    case "3":
      return "Bữa phụ";
    default:
      return "";
  }
};

export const calculateBMI = (height: number, weight: number) => {
  let convertHeight = height / 100;
  const bmi = weight / Math.pow(convertHeight, 2);
  return bmi.toFixed(2);
};

export const evaluateBMI = (bmi: number) => {
  switch (true) {
    case bmi > 40:
      return "Béo phì độ III";
    case bmi >= 35:
      return "Béo phì độ II";
    case bmi >= 30:
      return "Béo phì độ I";
    case bmi >= 25:
      return "Thừa cân";
    case bmi >= 18.5:
      return "Bình thường";
    case bmi >= 17:
      return "Gầy độ I";
    case bmi >= 16:
      return "Gầy độ II";
    case bmi < 16:
      return "Gầy độ III";
    default:
      return "Không xác định";
  }
};

export const getCurrentDate = () => {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const convertTitle = (title: string) => {
  switch (title) {
    case "foods":
      return "Thực phẩm";
    case "exercises":
      return "Luyện tập";
    case "news":
      return "Bài viết";
    default:
      return "";
  }
};

export const convertHeaderTitle = (title: string) => {
  switch (title) {
    case "foods":
      return "Thực phẩm dinh dưỡng";
    case "exercises":
      return "Bài tập thể dục thể thao";
    case "news":
      return "Các bài viết về sức khỏe";
    default:
      return "";
  }
};
