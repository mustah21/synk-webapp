package com.synk.backend.mapper;


import com.synk.backend.dto.registrationDto.AttendeeDtoRequest;
import com.synk.backend.dto.registrationDto.MyRegistrationDtoRequest;
import com.synk.backend.entity.Event;
import com.synk.backend.entity.Registration;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {UserMapper.class, EventMapper.class})
public interface RegistrationMapper {

    MyRegistrationDtoRequest toMyRegistrationDto(Registration registration);
    AttendeeDtoRequest toAttendeeDto(Registration registration);
    void leaveEvent(Event event, @MappingTarget Registration registration);

}