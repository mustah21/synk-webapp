package com.synk.backend.service.Impl;


import com.synk.backend.dto.registrationDto.AttendeeDtoRequest;
import com.synk.backend.dto.registrationDto.MyRegistrationDtoRequest;
import com.synk.backend.entity.Event;
import com.synk.backend.entity.Registration;
import com.synk.backend.entity.User;
import com.synk.backend.exceptions.ResourceNotFoundException;
import com.synk.backend.mapper.RegistrationMapper;
import com.synk.backend.repository.EventRepository;
import com.synk.backend.repository.RegistrationRepository;
import com.synk.backend.repository.UserRepository;
import com.synk.backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RegistrationServiceImpl {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final SecurityUtils securityUtils;
    private final RegistrationRepository registrationRepository;
    private final RegistrationMapper registrationMapper;


    private User findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not Found "));
    }

    private Event findEvent(String eventId) {
        return eventRepository.findByPublicId(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not Found "));
    }

    @Transactional
    public void joinEvent(String eventId) {
        Long userId = securityUtils.getAuthenticatedUserId();
        log.info("Log, Authenticated userId: {}", securityUtils.getAuthenticatedUserId());
        Event event = findEvent(eventId);
        log.info("Log, Event Id: {}", eventId);
        User user = findUser(userId);
        log.info("Log, User Id: {}", userId);

        if (registrationRepository.existsByUserAndEvent(user, event)) {
            System.out.println("User already registered for this event");
            throw new IllegalStateException("User already registered for this event");
        }

        Registration registration = new Registration();
        registration.setEvent(event);
        registration.setUser(user);


        registration.setStatus(Registration.Status.WAITLISTED);
        log.info("User {} waitlisted event {}", userId, eventId);
        System.out.println("User waitlisted for this event");

        registrationRepository.save(registration);
        registration.setStatus(Registration.Status.CONFIRMED);
        System.out.println("User registered for this event");
        log.info("User {} joined event {}", userId, eventId);

    }

    @Transactional
    public void leaveEvent(String eventId) {
        Long userId = securityUtils.getAuthenticatedUserId();
        Event event = findEvent(eventId);
        User user = findUser(userId);

        Registration registration = registrationRepository.findByUserAndEvent(user, event)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found"));

        registrationRepository.delete(registration);
        log.info("User {} left event {}", userId, eventId);
    }

    public List<MyRegistrationDtoRequest> getUserRegistrations() {
        Long userId = securityUtils.getAuthenticatedUserId();
        User user = findUser(userId);
        return registrationRepository.findByUser(user)
                .stream()
                .map(registrationMapper::toMyRegistrationDto)
                .toList();
    }

    public List<AttendeeDtoRequest> getEventRegistrations(String eventId) {
        Event event = findEvent(eventId);
        return registrationRepository.findByEvent(event)
                .stream()
                .map(registrationMapper::toAttendeeDto)
                .toList();
    }

    @Transactional
    public void updateRegistrationStatus(Long registrationId, Registration.Status status) {
        Registration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found"));
        registration.setStatus(status);
        registrationRepository.save(registration);
        log.info("Registration {} status updated to {}", registrationId, status);
    }

}
