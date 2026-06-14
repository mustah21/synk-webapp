package com.synk.backend.mapper;

import com.synk.backend.dto.eventDto.EventResponseDto;
import com.synk.backend.dto.eventDto.EventSummaryDto;
import com.synk.backend.entity.Event;
import org.mapstruct.Mapping;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface EventMapper {

    @Mapping(target = "creator", source = "creator")
    @Mapping(target = "registeredCount", expression = "java(event.getRegistrations() != null ? event.getRegistrations().size() : 0)")
    EventResponseDto toResponseDto(Event event);

    EventSummaryDto toSummaryDto(Event event);
}