package com.synk.backend.repository;


import com.synk.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByPublicId(String publicId);
    List<User> findByFirstName(String firstName);
    boolean existsByEmail(String email);

}