//package com.synk.backend.service;
//
//
//import com.synk.backend.dto.eventDto.CreateEventRequestDto;
//import com.synk.backend.dto.eventDto.EventResponseDto;
//import com.synk.backend.dto.eventDto.EventUpdateRequestDto;
//import com.synk.backend.entity.Event;
//import com.synk.backend.entity.User;
//import com.synk.backend.exceptions.ResourceNotFoundException;
//import com.synk.backend.exceptions.UnauthorizedException;
//import com.synk.backend.mapper.EventMapper;
//import com.synk.backend.repository.EventRepository;
//import com.synk.backend.repository.UserRepository;
//import org.springframework.transaction.annotation.Transactional;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//@Slf4j
//@RequiredArgsConstructor
//@Transactional(readOnly = true)
//public class GameServiceImpl {
//
//
//    private final EventRepository eventRepository;
//    private final UserRepository userRepository;
//    private final EventMapper eventMapper;
//
//    private User findUser(Long userId) {
//        return userRepository.findById(userId)
//                .orElseThrow(() -> new ResourceNotFoundException("User not Found "));
//    }
//
//    private Event findEvent(String eventId) {
//        return eventRepository.findByPublicId(eventId)
//                .orElseThrow(() -> new ResourceNotFoundException("Event not Found "));
//    }
//
//    private void verifyOwnership(Event event, Long userId) {
//        if (!event.getCreator().getId().equals(userId)) {
//            throw new UnauthorizedException("Access denied. " + userId + " is not the owner of this event.");
//        }
//    }
//
//    // current logged in user's ID, not the creator's ID from the event itself. get that from the jwt token
//    // also there is an issue of long and string when verifying ownership
//    // please fix this
//
//    @Transactional
//    public EventResponseDto createEvent(CreateEventRequestDto createEventRequestDto) {
//        User user = findUser(createEventRequestDto.userId());
//        Event event = eventMapper.toCreateEvent(createEventRequestDto, user);
//        Event saved = eventRepository.save(event);
//
//        log.info("Event created successfully.");
//        return eventMapper.toResponseDto(saved);
//    }
//
//    public EventResponseDto getTasks(String eventId, Long userId) {
//        Event event = findEvent(eventId);
//        verifyOwnership(event, userId);
//        return eventMapper.toResponseDto(event);
//    }
//
//    public List<EventResponseDto> getTasksByUserId(Long userId) {
//        User user = findUser(userId);
//        return eventRepository.findByCreator(user)
//                .stream()
//                .map(eventMapper::toResponseDto)
//                .toList();
//    }
//
//    public List<EventResponseDto> getEventByHostingDateAndUser(Long userId, LocalDateTime hostDate) {
//        User user = findUser(userId);
//        return eventRepository
//                .findByCreatorAndHostingDateBetween(user, hostDate)
//                .stream()
//                .map(eventMapper::toResponseDto)
//                .toList();
//    }
//
//    public List<EventResponseDto> getEventByHostingDate(LocalDateTime hostDate) {
//        return eventRepository
//                .findByHostingDate(hostDate)
//                .stream()
//                .map(eventMapper::toResponseDto)
//                .toList();
//    }
//
//    @Transactional
//    public EventResponseDto updateEvent(String eventId, EventUpdateRequestDto eventUpdateRequestDto) {
//
//        Event event = findEvent(eventId);
//        verifyOwnership(event, event.getCreator().getId());
//
//        eventMapper.updateEventFromDto(eventUpdateRequestDto, event);
//
//        return eventMapper.toResponseDto(eventRepository.save(event));
//    }
//
//    @Transactional
//    public String deleteEvent(String eventId) {
//        Event event = findEvent(eventId);
//        verifyOwnership(event, event.getCreator().getId());
//        eventRepository.delete(event);
//        return event.getTitle() + " has been deleted successfully";
//    }
//
//}
