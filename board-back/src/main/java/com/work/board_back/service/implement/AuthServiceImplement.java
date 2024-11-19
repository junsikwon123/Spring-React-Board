package com.work.board_back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.work.board_back.dto.request.auth.SignInRequestDto;
import com.work.board_back.dto.request.auth.SignInResponseDto;
import com.work.board_back.dto.request.auth.SignUpRequestDto;
import com.work.board_back.dto.response.ResponseDto;
import com.work.board_back.dto.response.auth.SignUpResponseDto;
import com.work.board_back.entity.UserEntity;
import com.work.board_back.provider.JwtProvider;
import com.work.board_back.repository.UserRespository;
import com.work.board_back.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService {

    private final UserRespository userRespository;

    private final JwtProvider JwtProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

        try {
            String email = dto.getEmail();
            boolean existsByEmail = userRespository.existsByEmail(email);
            if (existsByEmail)
                return SignUpResponseDto.duplicateEmail();

            String nickname = dto.getNickname();
            boolean existsByNickname = userRespository.existsByNickname(nickname);
            if (existsByNickname)
                return SignUpResponseDto.duplicateNickname();

            String telNumber = dto.getTelNumber();
            boolean existsByTelNumber = userRespository.existsByTelNumber(telNumber);
            if (existsByTelNumber)
                return SignUpResponseDto.duplicateTelNumber();

            String password = dto.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            dto.setPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRespository.save(userEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignUpResponseDto.success();
    }

    @Override
    public ResponseEntity<? super SignInResponseDto> singIn(SignInRequestDto dto) {
        String token = null;

        try {
            String email = dto.getEmail();
            UserEntity userEntity = userRespository.findByEmail(email);
            if (userEntity == null)
                return SignInResponseDto.signInFailed();

            String password = dto.getPassword();
            String encodedPasword = userEntity.getPassword();
            boolean isMatched = passwordEncoder.matches(password, encodedPasword);
            if (!isMatched)
                return SignInResponseDto.signInFailed();

            token = JwtProvider.create(email);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return SignInResponseDto.success(token);
    }

}
