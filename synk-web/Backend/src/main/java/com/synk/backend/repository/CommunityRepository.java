package com.synk.backend.repository;

import com.synk.backend.entity.Community;
import com.synk.backend.entity.CommunityMember;
import com.synk.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    Optional<Community> findByPublicId(String publicId);
    List<Community> findByCreator(User creator);
    boolean existsByPublicId(String publicId);

}