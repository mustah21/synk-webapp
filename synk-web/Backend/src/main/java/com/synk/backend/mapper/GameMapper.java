package com.synk.backend.mapper;

import com.synk.backend.dto.gamesDto.GameResponseDto;
import com.synk.backend.dto.gamesDto.GameSummaryDto;
import com.synk.backend.entity.Game;
import org.mapstruct.Mapping;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface GameMapper {

    @Mapping(target = "creator", source = "creator")
    @Mapping(target = "registeredCount", expression = "java(game.getRegistrations() != null ? game.getRegistrations().size() : 0)")
    GameResponseDto toResponseDto(Game game);

    GameSummaryDto toSummaryDto(Game game);
}