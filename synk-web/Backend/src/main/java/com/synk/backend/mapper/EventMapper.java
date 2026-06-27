package com.synk.backend.mapper;

import com.synk.backend.dto.eventDto.CreateEventRequestDto;
import com.synk.backend.dto.eventDto.EventResponseDto;
import com.synk.backend.dto.eventDto.EventSummaryDto;
import com.synk.backend.dto.eventDto.EventUpdateRequestDto;
import com.synk.backend.entity.Event;
import com.synk.backend.entity.User;
import org.mapstruct.Context;
import org.mapstruct.Mapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = UserMapper.class)

public interface EventMapper {

    @Mapping(target = "creator", source = "creator")
    @Mapping(target = "registeredCount", expression = "java(event.getRegistrations() != null ? event.getRegistrations().size() : 0)")
    EventResponseDto toResponseDto(Event event);  // flows from DB to client

    @Mapping(target = "creator", source = "user")
    @Mapping(target = "publicId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "registrations", ignore = true)
    @Mapping(target = "eventId", ignore = true)
    Event toCreateEvent(CreateEventRequestDto event, User user);  // flows from client to db (entity)

    EventSummaryDto toSummaryDto(Event event);

    @Mapping(target = "creator", ignore = true)
    @Mapping(target = "publicId", ignore = true)
    void updateEventFromDto(EventUpdateRequestDto dto, @MappingTarget Event event);
}