using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Sam.Extensions.EntityFramework.EFHooks
{
    public class HookRunner
    {
        private readonly DbContextHooks _ctx;
        private readonly HookedEntityEntry[] _modifiedEntries;

        public HookRunner(DbContextHooks ctx)
        {
            _ctx = ctx;
            _modifiedEntries = ctx.Context.ChangeTracker.Entries()
                .Where(x => x.State != EntityState.Unchanged && x.State != EntityState.Detached)
                .Select(x => new HookedEntityEntry
                {
                    Entity = x.Entity,
                    PreSaveState = x.State
                })
                .ToArray();

        }

        public void RunPreActionHooks()
        {
            ExecutePreActionHooks(_modifiedEntries, false); // Regardless of validation (executing the hook possibly fixes validation errors)

            var hasValidationErrors = _ctx.Context.Configuration.ValidateOnSaveEnabled && _ctx.Context.ChangeTracker.Entries().Any(x => x.State != EntityState.Unchanged && !x.GetValidationResult().IsValid);

            if (!hasValidationErrors)
            {
                ExecutePreActionHooks(_modifiedEntries, true);
            }
        }


        /// <summary>
        /// Executes the pre action hooks, filtered by <paramref name="requiresValidation"/>.
        /// </summary>
        /// <param name="modifiedEntries">The modified entries to execute hooks for.</param>
        /// <param name="requiresValidation">if set to <c>true</c> executes hooks that require validation, otherwise executes hooks that do NOT require validation.</param>
        private void ExecutePreActionHooks(IEnumerable<HookedEntityEntry> modifiedEntries, bool requiresValidation)
        {
            foreach (var entityEntry in modifiedEntries)
            {
                var entry = entityEntry; //Prevents access to modified closure

                foreach (var hook in _ctx.PreHooks.Where(x => (x.HookStates & entry.PreSaveState) == entry.PreSaveState && x.RequiresValidation == requiresValidation))
                {
                    var metadata = new HookEntityMetadata(HookType.Pre, entityEntry, entityEntry.PreSaveState, _ctx.Context);
                    hook.HookObject(entityEntry.Entity, metadata);

                    if (metadata.HasStateChanged)
                    {
                        entityEntry.PreSaveState = metadata.State;
                    }
                }

                if (!requiresValidation)
                {
                    var hookedEntity = entry.Entity as IPreActionHook;
                    if (hookedEntity != null)
                    {
                        var metadata = new HookEntityMetadata(HookType.Pre, entityEntry, entityEntry.PreSaveState, _ctx.Context);
                        hookedEntity.HookObject(entry.Entity, metadata);
                    }
                }
            }
        }

        public void RunPostActionHooks()
        {
            var hasPostHooks = _ctx.PostHooks.Any(); // Save this to a local variable since we're checking this again later.
            if (hasPostHooks)
            {
                foreach (var entityEntry in _modifiedEntries)
                {
                    var entry = entityEntry;

                    var hookedEntity = entry.Entity as IPostActionHook;
                    if (hookedEntity != null)
                    {
                        var metadata = new HookEntityMetadata(HookType.Post, entityEntry, entityEntry.PreSaveState, _ctx.Context);
                        hookedEntity.HookObject(entry.Entity, metadata);
                    }


                    //Obtains hooks that 'listen' to one or more Entity States
                    foreach (var hook in _ctx.PostHooks.Where(x => (x.HookStates & entry.PreSaveState) == entry.PreSaveState))
                    {
                        var metadata = new HookEntityMetadata(HookType.Post, entityEntry, entityEntry.PreSaveState, _ctx.Context);
                        hook.HookObject(entityEntry.Entity, metadata);
                    }
                }
            }
        }
    }
}