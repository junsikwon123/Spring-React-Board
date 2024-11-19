package com.work.board_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.work.board_back.entity.CommentEntity;

@Repository
public interface CommnetRepository extends JpaRepository<CommentEntity, Integer> {

}
