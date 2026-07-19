package com.synk.backend.mapper;


import com.synk.backend.dto.chatMessage.ChatMessageResponse;
import com.synk.backend.entity.ChatMessage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ChatMessageMapper {

    @Mapping(target = "senderPublicId", source = "sender.publicId")
    @Mapping(target = "senderFirstName", source = "sender.firstName")
    @Mapping(target = "senderLastName", source = "sender.lastName")
    ChatMessageResponse toDto(ChatMessage chatMessage);

}
