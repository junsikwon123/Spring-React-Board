package com.work.board_back.service;

import org.springframework.http.ResponseEntity;

import com.work.board_back.dto.request.auth.SignInRequestDto;
import com.work.board_back.dto.request.auth.SignInResponseDto;
import com.work.board_back.dto.request.auth.SignUpRequestDto;

import com.work.board_back.dto.response.auth.SignUpResponseDto;

public interface AuthService {

    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);

    ResponseEntity<? super SignInResponseDto> singIn(SignInRequestDto dto);

}
