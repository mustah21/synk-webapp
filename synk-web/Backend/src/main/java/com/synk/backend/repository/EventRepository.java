package com.synk.backend.repository;


import com.synk.backend.dto.eventDto.EventResponseDto;
import com.synk.backend.entity.Event;
import com.synk.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findByPublicId(String id);
    List<Event> findByEventId(Long eventId);
    List<Event> findByTitle(String title);
    List<Event> findByCreator(User creator);
    List<Event> findByHostingDate(LocalDateTime date);
    List<Event> findByCreatorAndHostingDate(User creator, LocalDateTime hostDate);
    List<Event> findEventByCreatedAtExists();
    List<Event> findByHostingDateAfter(LocalDateTime date);

}