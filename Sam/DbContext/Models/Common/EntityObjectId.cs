﻿using System;
using Sam.DbContext.Hooks;
using T4TS;

namespace Sam.DbContext
{
    /// <summary>
    /// Базовый класс для всех сущностей БД, имеющих не строковое ключевое поле Id.
    /// </summary>
    /// <typeparam name="TKey">Тип ключевого поля.</typeparam>
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
        public User CreatedBy { get; set; }


        [FillWithCurrentDate(OnCreateOnly = false)]
        public DateTime ModifiedDate { get; set; }

        [FillWithCurrentUser(OnCreateOnly = false)]
        public string ModifiedById { get; set; }
        public User ModifiedBy { get; set; }
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