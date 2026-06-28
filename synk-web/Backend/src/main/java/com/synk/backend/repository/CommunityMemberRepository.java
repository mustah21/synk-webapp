package com.synk.backend.repository;


import com.synk.backend.entity.Community;
import com.synk.backend.entity.CommunityMember;
import com.synk.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityMemberRepository extends JpaRepository<CommunityMember, Long> {

    Optional<CommunityMember> findByUserAndCommunity(User user, Community community);
    List<CommunityMember> findByCommunity(Community community);
    List<CommunityMember> findByUser(User user);
    boolean existsByUserAndCommunity(User user, Community community);
}