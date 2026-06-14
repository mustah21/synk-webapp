package com.synk.backend.mapper;


import com.synk.backend.dto.registrationDto.AttendeeDtoRequest;
import com.synk.backend.dto.registrationDto.MyRegistrationDtoRequest;
import com.synk.backend.entity.Registration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {UserMapper.class, GameMapper.class})
public interface RegistrationMapper {

    MyRegistrationDtoRequest toMyRegistrationDto(Registration registration);
    AttendeeDtoRequest toAttendeeDto(Registration registration);

}