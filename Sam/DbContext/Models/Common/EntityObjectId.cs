﻿using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Sam.DbContext.Hooks;
using T4TS;

namespace Sam.DbContext
{
    /// <summary>
    /// Базовый класс для всех сущностей БД, имеющих не строковое ключевое поле Id.
    /// </summary>
    /// <typeparam name="TKey">Тип ключевого поля.</typeparam>
    [TypeScriptInterface(Name = "EntityObjectBaseId")]
    public class EntityObjectId<TKey> : IEntityObjectId<TKey>
    {
        /// <summary>
        /// Уникальный идентификатор объекта.
        /// Заполняется автоматически при сохранении нового объекта (для этого должен быть не заполнен перед сохранением).
        /// </summary>
        public TKey Id { get; set; }


        [FillWithCurrentDate(OnCreateOnly = true)]
        public DateTime CreatedDate { get; set; }

        [FillWithCurrentUser(OnCreateOnly = true)]
        public string CreatedById { get; set; }
        [TypeScriptMember(Type = "App.IUser")]
        [JsonIgnore]
        public User CreatedBy { get; set; }
        [JsonProperty("CreatedBy")]
        [NotMapped]
        public JsonUser JsonCreatedBy { get { return JsonUser.Create(CreatedBy); } set { CreatedBy = value.ToUser(); } }


        [FillWithCurrentDate(OnCreateOnly = false)]
        public DateTime ModifiedDate { get; set; }

        [FillWithCurrentUser(OnCreateOnly = false)]
        public string ModifiedById { get; set; }
        [TypeScriptMember(Type = "App.IUser")]
        [JsonIgnore]
        public User ModifiedBy { get; set; }
        [JsonProperty("ModifiedBy")]
        [NotMapped]
        public JsonUser JsonModifiedBy { get { return JsonUser.Create(ModifiedBy); } set { ModifiedBy = value.ToUser(); } }
    }


    /// <summary>
    /// Базовый класс для всех сущностей БД, имеющих строковое ключевое поле Id.
    /// </summary>
    [TypeScriptInterface]
    public class EntityObjectId : EntityObjectId<string>, IEntityObjectId
    {
/*
        /// <summary>
        /// Уникальный идентификатор объекта.
        /// Заполняется автоматически при сохранении нового объекта (для этого должен быть не заполнен перед сохранением).
        /// Представляет собой GUID без скобок в виде xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
        /// </summary>
        public string Id { get; set; }
*/
    }


}