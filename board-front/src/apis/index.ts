import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { ResponseDto } from "./reponse";
import SignInResponseDto from "./reponse/auth/sign-in.response.dto";

const DOMAIN = 'http://localhost:4000';

const APT_DOMAIN = `${DOMAIN}/api/v1`

const SIGN_IN_URL = () => `${APT_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${APT_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const signUpRequest = async (requestBody: SignUpRequestDto) => {

}