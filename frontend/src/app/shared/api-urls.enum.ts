const serverURL = "http://localhost:8080/"
const baseURL = serverURL + "api/";
const watchesURL = serverURL + "questionnaire/" 

export enum ApiUrls {
  LogIn = baseURL + 'auth/login',
  HouseholdAvailability = baseURL + 'household/availability',
  ViewPendingRequests = baseURL + 'request/get/pending',
  AcceptRequest = baseURL + 'request/accept',
  DeclineRequest = baseURL + 'request/decline',
  Household= baseURL + 'household',
  CreateRealEstate = baseURL + 'realEstate/create',
  CreateHousehold = baseURL + 'household/create',
  Cities = baseURL + 'city/get',
  ViewUserRequests = baseURL + "request/get",
  GetUserById = baseURL + "user",
  ChangePassword = baseURL + "user/change-password",
  Users = baseURL + "user/all",
  UploadImage = serverURL + "upload/",
  AddUser = baseURL + "users",
  SignUp = baseURL + "auth/signup",

  GenerateKey = baseURL + "kms/generate-key",
  Encrypt = baseURL + "kms/encrypt",
  Decrypt = baseURL + "kms/decrypt",
  Rotate = baseURL + "kms/rotate-key",
  MyKeys = baseURL + "kms/my-keys",
  Sign = baseURL + "kms/sign",
  Verify = baseURL + "kms/verify",

  TrendingWatches = watchesURL + "trending-watches",
  StartQuestionnaire = watchesURL + "start",
  Answer = watchesURL + "answer",
  GetRecommendations = watchesURL + "recommendations/",
  RecommendationHistory = watchesURL + "history",
  CustomQuestions = watchesURL + "custom-questions",
  IconicWatchQuestions = watchesURL + "iconic-watch-questions",
  AllWatches = watchesURL + "watches"
}
