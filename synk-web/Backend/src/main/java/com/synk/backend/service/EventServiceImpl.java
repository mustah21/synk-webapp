package com.synk.backend.service;


import com.synk.backend.dto.eventDto.CreateEventRequestDto;
import com.synk.backend.dto.eventDto.EventResponseDto;
import com.synk.backend.dto.eventDto.EventUpdateRequestDto;
import com.synk.backend.entity.Event;
import com.synk.backend.entity.Registration;
import com.synk.backend.entity.User;
import com.synk.backend.exceptions.ResourceNotFoundException;
import com.synk.backend.exceptions.UnauthorizedException;
import com.synk.backend.mapper.EventMapper;
import com.synk.backend.repository.EventRepository;
import com.synk.backend.repository.RegistrationRepository;
import com.synk.backend.repository.UserRepository;
import com.synk.backend.util.SecurityUtils;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventServiceImpl {


    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EventMapper eventMapper;
    private final SecurityUtils securityUtils;
    private final RegistrationRepository registrationRepository;

    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not Found "));
    }

    private Event findEvent(String eventId) {
        return eventRepository.findByPublicId(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not Found "));
    }

    private void verifyOwnership(Event event, Long userId) {
        String authenticatedUserId = String.valueOf(securityUtils.getAuthenticatedUserId());
        if (!Objects.equals(event.getCreator().getId(), authenticatedUserId)) {
            throw new UnauthorizedException("Access denied. " + userId + " is not the owner of this event.");
        }
    }

    @Transactional
    public EventResponseDto createEvent(CreateEventRequestDto createEventRequestDto, Long userId) {
        log.info("Finding user with id: {}", userId);
        User user = findUser(userId);
        log.info("User found: {}", user.getEmail());

        Event event = eventMapper.toCreateEvent(createEventRequestDto, user);
        log.info("Event mapped: {}", event);

        Event saved = eventRepository.save(event);
        log.info("Event saved with id: {}", saved.getPublicId());

        log.info("Event created successfully.");
        return eventMapper.toResponseDto(saved);
    }

    public EventResponseDto getEvents(String eventId, Long userId) {
        Event event = findEvent(eventId);
        verifyOwnership(event, userId);
        return eventMapper.toResponseDto(event);
    }

    public List<EventResponseDto> getEventsByUserId(Long userId) {
        User user = findUser(userId);
        return eventRepository.findByCreator(user)
                .stream()
                .map(eventMapper::toResponseDto)
                .toList();
    }

    public List<EventResponseDto> getEventByHostingDateAndUser(Long userId, LocalDateTime hostDate) {
        User user = findUser(userId);
        return eventRepository
                .findByCreatorAndHostingDate(user, hostDate)
                .stream()
                .map(eventMapper::toResponseDto)
                .toList();
    }

    public List<EventResponseDto> getEventByHostingDate(LocalDateTime hostDate) {
        return eventRepository
                .findByHostingDate(hostDate)
                .stream()
                .map(eventMapper::toResponseDto)
                .toList();
    }

    @Transactional
    public EventResponseDto updateEvent(String eventId, EventUpdateRequestDto eventUpdateRequestDto) {

        Event event = findEvent(eventId);
        verifyOwnership(event, event.getCreator().getId());

        eventMapper.updateEventFromDto(eventUpdateRequestDto, event);

        return eventMapper.toResponseDto(eventRepository.save(event));
    }

    @Transactional
    public String deleteEvent(String eventId) {
        Event event = findEvent(eventId);
        verifyOwnership(event, event.getCreator().getId());
        eventRepository.delete(event);
        return event.getTitle() + " has been deleted successfully";
    }

    @Transactional
    public void joinEvent(String eventId, Long userId) {
        Event event = findEvent(eventId);
        User user = findUser(userId);


        Registration registration = new Registration();
        registration.setEvent(event);
        registration.setUser(user);
        registration.setStatus(Registration.Status.WAITLISTED);
        log.info("User {} waitlisted event {}", userId, eventId);

        registrationRepository.save(registration);
        registration.setStatus(Registration.Status.CONFIRMED);
        log.info("User {} joined event {}", userId, eventId);


    }


}
