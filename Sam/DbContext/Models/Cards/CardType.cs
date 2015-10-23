using T4TS;

namespace Sam.DbContext
{
    [TypeScriptEnum]
    public enum CardType
    {
        Internal = 0,
        Guest = 1,
        External = 2,
        Replacement = 3,
    }
}