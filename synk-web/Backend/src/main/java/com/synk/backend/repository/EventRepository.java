package com.synk.backend.repository;


import com.synk.backend.entity.Event;
import com.synk.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findByPublicId(String id);
    List<Event> findByTitle(String title);
    List<Event> findByCreator(User creator);
    List<Event> findByHostingDateAfter(LocalDateTime date);
}